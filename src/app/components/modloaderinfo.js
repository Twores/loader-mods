export const ModLoaderInfo = () => {
    const { metadata } = useMetadata();
    const version = metadata?.modloader_version;
  
    if (!version) return null;
  
    return (
      <>
        <li>
          <div className={styles.mineload}>
            <ModLoaderLabel />
            <ModLoaderVersion />
          </div>
        </li>
        <li className={styles.separator}>/</li>
      </>
    );
  };