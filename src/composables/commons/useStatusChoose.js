export default function useStatusChoose(status, emit, eventName) {
    const options = status.toOptions();

    const updateModelValue = (val) => emit(eventName, val);

    return {
        options,
        updateModelValue,
    };
}
