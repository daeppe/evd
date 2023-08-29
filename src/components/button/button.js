import styles from './button.module.css';

const Button = (props) => {
    const child = props.children;
    const type = props.type;
    const onClick = props.onClick;

    return <button className={styles['button']} type={type} onClick={onClick}>{child}</button>;
};

export default Button;