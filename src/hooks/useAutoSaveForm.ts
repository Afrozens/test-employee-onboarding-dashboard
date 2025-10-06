import { useEffect, useRef, useCallback } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface UseAutoSaveFormProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    action: 'create' | 'edit';
    recordId?: string;
    enabled?: boolean;
}

export function useAutoSaveForm<T extends FieldValues>({
    form,
    action,
    recordId,
    enabled = true
}: UseAutoSaveFormProps<T>) {
    const { getValues, reset } = form;
    
    const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasSubmittedRef = useRef(false);
    const isInitialLoadRef = useRef(true);

    const draftKey = `employee-draft-${action}${recordId ? `-${recordId}` : ''}`;

    const saveDraft = useCallback(() => {
        if (hasSubmittedRef.current || !enabled) return;
        
        try {
            const currentData = getValues();
            const hasData = Object.values(currentData as any).some(value => 
                value !== undefined && value !== null && value !== ''
            );
            
            if (hasData) {
                const draftData = {
                    ...currentData,
                    savedAt: new Date().toISOString(),
                    action,
                    recordId
                };
                localStorage.setItem(draftKey, JSON.stringify(draftData));
                console.log('Draft saved automatically');
            }
        } catch (error) {
            console.error('Error saving draft:', error);
        }
    }, [getValues, enabled, action, recordId, draftKey]);

    const loadDraft = useCallback(() => {
        if (!enabled) return false;
        
        try {
            const savedDraft = localStorage.getItem(draftKey);
            if (savedDraft) {
                const draft = JSON.parse(savedDraft);
                
                if (draft.action === action && draft.recordId === recordId) {
                    reset(draft);
                    return true;
                }
            }
        } catch (error) {
            console.error('Error loading draft:', error);
        }
        return false;
    }, [reset, enabled, action, recordId, draftKey]);

    const clearDraft = useCallback(() => {
        localStorage.removeItem(draftKey);
        hasSubmittedRef.current = true;
    }, [draftKey]);

    const initializeWithData = useCallback((data: T) => {
        if (isInitialLoadRef.current) {
            reset(data);
            isInitialLoadRef.current = false;
        }
    }, [reset]);

    const markAsSubmitted = useCallback(() => {
        hasSubmittedRef.current = true;
        clearDraft();
    }, [clearDraft]);

    useEffect(() => {
        if (!enabled) return;

        if (autoSaveIntervalRef.current) {
            clearInterval(autoSaveIntervalRef.current);
        }

        autoSaveIntervalRef.current = setInterval(() => {
            saveDraft();
        }, 30000);

        return () => {
            if (autoSaveIntervalRef.current) {
                clearInterval(autoSaveIntervalRef.current);
            }
        };
    }, [saveDraft, enabled]);

    useEffect(() => {
        return () => {
            if (!hasSubmittedRef.current && enabled) {
                saveDraft();
            }
        };
    }, [saveDraft, enabled]);

    useEffect(() => {
        if (enabled && isInitialLoadRef.current) {
            const hasLoadedDraft = loadDraft();
            if (!hasLoadedDraft) {
                isInitialLoadRef.current = false;
            }
        }
    }, [loadDraft, enabled]);

    return {
        saveDraft,
        loadDraft,
        clearDraft,
        initializeWithData,
        markAsSubmitted,
        hasDraft: !!localStorage.getItem(draftKey)
    };
}