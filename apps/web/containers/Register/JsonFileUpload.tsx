import cx from 'classnames';
import { ChangeEvent, useState } from 'react';

import { apiBe, getHeaders } from '@/services';
import { IContent } from '@/types';

import styles from './index.module.scss';

const JsonFileUpload = () => {
  const [jsonData, setJsonData] = useState<IContent>();

  const handleJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target!.result as string;

      const parsedData = JSON.parse(result);
      setJsonData(parsedData);
    };
    reader.readAsText(file!);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = getHeaders();

    try {
      const response = await apiBe.post('/v1/contents', jsonData, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };

  return (
    <form className={cx(styles.formWrap, styles.jsonFileForm)} onSubmit={handleSubmit}>
      <label>
        <p>JSON File</p>
        <input
          type="file"
          name="json"
          className={styles.inputFile}
          accept=".json"
          onChange={(e) => handleJSON(e)}
          required
        />
      </label>

      <button type="submit" className={styles.jsonFileSubmitButton}>
        전송
      </button>
    </form>
  );
};

export default JsonFileUpload;
