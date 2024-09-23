import styles from './Input.module.scss';

function Input(props: {
  id: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isValid: boolean;
  errorMessage?: string;
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
  isTextarea?: boolean;
}) {
  const {
    id,
    type,
    name,
    label,
    value,
    placeholder,
    handleChange,
    isValid,
    errorMessage,
    minLength,
    maxLength,
    isRequired,
    isTextarea,
  } = props;

  return (
    <div className={styles.input}>
      <label htmlFor={id} className={styles.input__label}>
        {label} {isRequired && <abbr title="required">*</abbr>}
      </label>

      <div className={styles.input__wrapper}>
        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            className={styles.input__input}
            onChange={handleChange}
            placeholder={placeholder}
            required={isRequired}
            minLength={minLength}
            maxLength={maxLength}
          >
            {value}
          </textarea>
        ) : (
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            className={styles.input__input}
            onChange={handleChange}
            placeholder={placeholder}
            required={isRequired}
            minLength={minLength}
            maxLength={maxLength}
          />
        )}

        {/* Display validation status as icons */}
        {isValid !== undefined && (
          <ValidationIcon label={label} isValid={isValid} />
        )}
      </div>

      {/* Display error messages, if there are any */}
      {errorMessage && !isValid && (
        <p className={styles.input__error}>{errorMessage}</p>
      )}
    </div>
  );
}

function ValidationIcon({
  label,
  isValid,
}: {
  label: string;
  isValid: boolean;
}) {
  return (
    <div
      className={styles.input__iconContainer}
      aria-label={`${label} is ${isValid ? 'valid' : 'invalid'}`}
    >
      {isValid ? (
        <svg
          className={`${styles.input__icon} ${styles.valid}`}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg
          className={`${styles.input__icon} ${styles.invalid}`}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )}
    </div>
  );
}

export default Input;
