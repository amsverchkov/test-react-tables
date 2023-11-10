import { ReactNode, useContext } from 'react'
import { Toast, ToastContainer, ToastProps } from 'react-bootstrap';
import { AppContext, IAppContext } from '../../context/AppContext';

interface ICustomToastProps extends ToastProps {
    children: ReactNode
}


export const CustomToast: React.FC<ICustomToastProps> = ({children, ...props}) => {

    const {showToast, setShowToast} = useContext<IAppContext>(AppContext);

    const onCloseHandler = () => setShowToast(false);
    
    return (
        <ToastContainer position="top-end">
             <Toast 
                show={showToast} 
                onClose={onCloseHandler} {...props} 
             >
                <Toast.Header />
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
