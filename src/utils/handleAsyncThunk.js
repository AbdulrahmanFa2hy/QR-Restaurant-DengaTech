export const setLoading = (state) => {
  state.loading = true;
  state.error = null;
  state.complete = false;
};

export const setError = (state, action) => {
  state.loading = false;
  state.error = action?.payload || "حدث خطأ غير متوقع";
  state.complete = false;
};

export const setSuccess = (state, setComplete) => {
  state.loading = false;
  state.complete = setComplete;
};

export const handleAsyncThunk = (
  builder,
  thunk,
  { onSuccess, onError, setComplete = true }
) => {
  builder
    .addCase(thunk.pending, (state) => {
      setLoading(state);
    })
    .addCase(thunk.fulfilled, (state, action) => {
      setSuccess(state, setComplete);
      onSuccess?.(state, action);
    })
    .addCase(thunk.rejected, (state, action) => {
      setError(state, action);
      onError?.(state, action);
    });
};
