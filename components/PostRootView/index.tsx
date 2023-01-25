import styles from '../../styles/Posts.module.scss';

const PostRootView = ({children}:any) => {
    return (
        <div className={styles.postwrapper}>
            {children}
        </div>
    )
}

export default PostRootView