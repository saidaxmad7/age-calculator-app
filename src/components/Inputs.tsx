import { useState } from "react";

function Inputs({ setResult }) {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [errors, setErrors] = useState({
        day: "",
        month: "",
        year: "",
    });

    const currentYear = new Date().getFullYear();

    const validate = () => {
        const newErrors = { day: "", month: "", year: "" };

        const d = Number(day);
        const m = Number(month);
        const y = Number(year);

        const today = new Date();

        if (!year) {
            newErrors.year = "This field is required";
        } else if (year.length !== 4) {
            newErrors.year = "Must be a valid year";
        } else if (y < 1900) {
            newErrors.year = "Must be a valid year";
        } else if (y > currentYear) {
            newErrors.year = "Must be in the past";
        }
        if (!month || m < 1 || m > 12)
            newErrors.month = "Must be a valid month";
        if (!day || d < 1 || d > 31) newErrors.day = "Must be a valid day";

        if (!newErrors.day && !newErrors.month) {
            const daysInMonth = new Date(y || 2024, m, 0).getDate();
            if (d > daysInMonth) {
                newErrors.day = "Must be a valid day";
            }
        }

        if (!newErrors.day && !newErrors.month && !newErrors.year) {
            const inputDate = new Date(y, m - 1, d);
            if (inputDate > today) {
                newErrors.year = "Must be in the past";
            }
        }

        setErrors(newErrors);

        return !newErrors.day && !newErrors.month && !newErrors.year;
    };

    const handleCalculate = () => {
        const isValid = validate();

        if (!isValid) return;

        const birthDate = new Date(year, month - 1, day);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const prevMonthDays = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            ).getDate();
            days += prevMonthDays;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        setResult({
            years,
            months,
            days,
        });
    };

    return (
        <div className='inputs'>
            <form
                className='inputs-form'
                onSubmit={(e) => {
                    e.preventDefault();
                    validate();
                }}
            >
                <div className={`inputs-group ${errors.day ? "error" : ""}`}>
                    <label>DAY</label>
                    <input
                        value={day}
                        onChange={(e) =>
                            e.target.value.length <= 2 && setDay(e.target.value)
                        }
                        placeholder='DD'
                    />
                    {errors.day && <small>{errors.day}</small>}
                </div>

                <div className={`inputs-group ${errors.month ? "error" : ""}`}>
                    <label>MONTH</label>
                    <input
                        value={month}
                        onChange={(e) =>
                            e.target.value.length <= 2 &&
                            setMonth(e.target.value)
                        }
                        placeholder='MM'
                    />
                    {errors.month && <small>{errors.month}</small>}
                </div>

                <div className={`inputs-group ${errors.year ? "error" : ""}`}>
                    <label>YEAR</label>
                    <input
                        value={year}
                        onChange={(e) =>
                            e.target.value.length <= 4 &&
                            setYear(e.target.value)
                        }
                        placeholder='YYYY'
                    />
                    {errors.year && <small>{errors.year}</small>}
                </div>
            </form>

            <div className='inputs-submit'>
                <span className='inputs-line'></span>
                <button type='button' onClick={handleCalculate}>
                    <img src='/images/icon-arrow.svg' alt='icon arrow' />
                </button>
            </div>
        </div>
    );
}

export default Inputs;
