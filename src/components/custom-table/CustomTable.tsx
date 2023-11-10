import { Workbook, WorkbookInstance } from '@fortune-sheet/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useRef, useState } from 'react';
import styles from './CustomTable.module.css';
import '@fortune-sheet/react/dist/index.css'
import { Button } from 'react-bootstrap';

interface IExcelStateData {
    r: number, c: number, v: {v?: string | number | boolean}
}

type ExcelOnChangeDataType  =  {v: string | number | boolean}[][];

interface IResultFileParse {
    [key: string]: string | boolean | number | undefined
}

export const CustomTable: React.FC<{fileContent: string}> = ({fileContent}) => {
    const [showExcelTable, setShowExcelTable] = useState<boolean>();
    const [excelData, setExcelData] = useState<IExcelStateData[]>([]);
    const [parsedData, setParsedData] = useState<IResultFileParse[]>([]);

    const ref = useRef<WorkbookInstance>();

    useEffect(() => {
        const result: IResultFileParse[] = [];
        if (!fileContent) {
            return;
        }
        const parsed: Record<string, IResultFileParse> = JSON.parse(fileContent);
        
        for (const key in parsed) {
            const concreteKeyResult = Array.from(Object.entries(parsed[key]), ([, value]) => value);
            for (let i = 0; i < concreteKeyResult.length; i++) {
                if (!result[i]) {
                    result[i] = {};    
                }
                result[i][key] = concreteKeyResult[i];
            }
        }
        setParsedData(result);
    }, [fileContent])


    const mapParsedDataToExcel = () => {
        if (parsedData.length) {
            const cellData: IExcelStateData[] = [];
            for (let i = 0; i < parsedData.length; i++) {
                const arrForSpreadsheet = Array.from(Object.entries(parsedData[i]), ([, value]) => value);
                arrForSpreadsheet.forEach((item, ind) => {
                    cellData.push({
                        r: i, c: ind, v: {v: item}
                    })
                })
            }
            setExcelData(cellData);
        }
    }

    const mapExcelDataToParsedData = (data: ExcelOnChangeDataType): IResultFileParse[] => {
            const result: IResultFileParse[] = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    if (data[i][j] !== null) {
                        if (!result[i]) {
                            // @ts-ignore
                            result[i] = [];
                        }
                        result[i][j] = data[i][j]['v']
                    }
                }    
            }
            setParsedData(result);
            return result;
    }

    const renderHeader = (obj: Record<string, string | boolean | number | undefined>) => {
        const result = []
        for (const key in obj) {
            result.push(<Column key={key} field={key} header={key} sortable filter/>);
        }
        return result;
    }

    const buttonToggleHandler = () => {
        setShowExcelTable((prev) => {
        if (prev === true) {
            // @ts-ignore
            const content = mapExcelDataToParsedData(ref.current.getSheet().data);
            localStorage.setItem('excelData', JSON.stringify(content));
        } else {
            mapParsedDataToExcel();
        }
        return !prev
    })}

    return (
        <div className={styles['tables_wrapper']}>
            <Button onClick={buttonToggleHandler} className={styles['toggle-tabes-button']}>Переключить вид таблицы</Button>
            {!showExcelTable 
                && <DataTable value={parsedData} tableStyle={{ minWidth: '50rem' }} className='datatable-responsive'>
                {(parsedData && parsedData[0]) && renderHeader(parsedData[0])}
            </DataTable>}
            
            { showExcelTable && excelData.length > 0 
                // @ts-ignore
                && <Workbook ref={ref} data={[{ name: 'Sheet1', celldata: excelData}]}/>}
        </div>
    )
}