import styles from './input.module.css';

const Input = (props) => {
    const type = props.type;
    const onChange = props.onChange;
    const placeholder = props.placeholder;

    return <input className={styles['input']} type={type} onChange={onChange} placeholder={placeholder} />;
};

export default Input;