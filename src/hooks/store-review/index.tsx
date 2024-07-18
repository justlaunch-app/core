import { useRef, useEffect, useCallback } from 'react';
import * as StoreReview from 'expo-store-review';

export function useStoreReviewRequestOnPress() {
  const hasRequestedReview = useRef(false);

  const showRequestReview = useCallback(async () => {
    if (hasRequestedReview.current) return;
    try {
      if (await StoreReview.hasAction()) {
        await StoreReview.requestReview();
      }
    } catch (error) {
      console.error(
        'FOR ANDROID: Make sure you meet all conditions to be able to test and use it: https://developer.android.com/guide/playcore/in-app-review/test#troubleshooting',
        error
      );
    } finally {
      hasRequestedReview.current = true;
    }
  }, []);

  return showRequestReview;
}

export function useStoreReviewRequest({ delay = 1000 } = {}) {
  const hasRequestedReview = useRef(false);

  const showRequestReview = useCallback(async () => {
    if (hasRequestedReview.current) return;
    try {
      if (await StoreReview.hasAction()) {
        await StoreReview.requestReview();
      }
    } catch (error) {
      console.error(
        'FOR ANDROID: Make sure you meet all conditions to be able to test and use it: https://developer.android.com/guide/playcore/in-app-review/test#troubleshooting',
        error
      );
    } finally {
      hasRequestedReview.current = true;
    }
  }, []);

  useEffect(() => {
    if (delay !== undefined) {
      const timeout = setTimeout(() => {
        showRequestReview();
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [delay, showRequestReview]);

  return showRequestReview;
}
