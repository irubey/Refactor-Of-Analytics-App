import styles from './../components/ImportData.module.css';

export default function Layout({children}: { children: React.ReactNode }) {
    return (
       <>
       <div className={styles.gridContainer}>
        {children}
       </div>
       </>
    )
}