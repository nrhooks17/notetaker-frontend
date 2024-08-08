export interface DaysOfWeekProps {
    dateSelected: string,
    setDateSelected: (dateSelected: string) => void,
    setUpperDateBound: (upperDateBound: string) => void,
    setLowerDateBound: (lowerDateBound: string) => void,
}