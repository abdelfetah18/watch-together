export default class Result<Error, Type> {
    private constructor(
        public readonly error?: Error,
        public readonly value?: Type
    ) { }

    public static success<Error, Type>(value: Type): Result<Error, Type> {
        return new Result<Error, Type>(undefined, value);
    }

    public static failure<Error, Type>(error: Error): Result<Error, Type> {
        return new Result<Error, Type>(error, undefined);
    }

    public isSuccess(): boolean {
        return this.error === undefined;
    }

    public isFailure(): boolean {
        return this.error !== undefined;
    }
}