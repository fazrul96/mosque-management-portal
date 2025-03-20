export const convertTo24HourFormat = (time: string): number => {
    const [hours, minutes] = time.split(":").map(num => parseInt(num, 10));
    return hours * 100 + minutes;
};
