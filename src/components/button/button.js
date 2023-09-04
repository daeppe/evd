import styles from './button.module.css';

const Button = (props) => {
    const child = props.children;
    const type = props.type;
    const onClick = props.onClick;
    const isLoading = props.isLoading;

    return <button className={styles['button']} type={type} onClick={onClick} disabled={isLoading} >{isLoading ? '' : child}</button>;
};

export default Button;