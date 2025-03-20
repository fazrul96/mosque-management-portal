import Swal from 'sweetalert2';

type TranslationFunction = (key: string) => string;

const Alert = {
    success: (title: string, text: string) => {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            confirmButtonText: 'OK',
        });
    },

    error: (title: string, text: string) => {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            confirmButtonText: 'OK',
        });
    },

    confirm: async (title: string, text: string, t: TranslationFunction) => {
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('confirmation.delete.confirmButtonText'),
            cancelButtonText: t('confirmation.delete.cancelButtonText'),
        });
        return result.isConfirmed;
    }
};

export default Alert;
