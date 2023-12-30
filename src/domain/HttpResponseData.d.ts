interface HttpResponseData<T> {
    status: 'success' | 'error';
    data: T extends 'success' ? T : any;
};