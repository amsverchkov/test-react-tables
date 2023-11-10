import { useContext, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext, IAppContext } from '../../context/AppContext';
import { CustomTable } from '../custom-table/CustomTable';
import { CustomToast } from '../custom-toast/CustomToast';

export const FileLoadForm: React.FC = () => {

    const {setShowToast} = useContext<IAppContext>(AppContext);
    const [fileContent, setFileContent] = useState<string>('');

    const fileReader = useMemo(() => {
        const fileData = new FileReader();
        fileData.onloadend = handleFile;
        return fileData;
    }, []);

    const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.currentTarget.value;
        if (uploadedFile.split('.').pop() !== 'json') {
            e.preventDefault();
            setShowToast(true);
            return;
        }
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            fileReader.readAsText(file);
        }
    };

    function handleFile (e: ProgressEvent<FileReader>) {
        const content = e?.target?.result as string;
        setFileContent(content);
        localStorage.setItem('uploadedJson', content);
    }

    
    return (
        <>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Загрузите файл: </Form.Label>
                <Form.Control type="file" onChange={onChangeFileHandler}/>
            </Form.Group>
            <CustomToast autohide={true}>Некорректное расширение файла, выберите json файл</CustomToast>
            <CustomTable fileContent={fileContent}/>
        </>
    );
};