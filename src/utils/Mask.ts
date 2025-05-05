// Máscaras
export const applyMask = (value: string, mask: string) => {
    let maskedValue = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length; i++) {
        if (valueIndex >= value.length) break;

        if (mask[i] === '9') {
            // Apenas números
            if (/[0-9]/.test(value[valueIndex])) {
                maskedValue += value[valueIndex++];
            }
        } else if (mask[i] === 'A') {
            // Apenas letras
            if (/[a-zA-Z]/.test(value[valueIndex])) {
                maskedValue += value[valueIndex++];
            }
        } else {
            // Caractere fixo da máscara
            maskedValue += mask[i];
            if (value[valueIndex] === mask[i]) {
                valueIndex++;
            }
        }
    }

    return maskedValue;
};

export const maskCPF = (value: string) => {
    return applyMask(value, '999.999.999-99');
};

export const maskPhone = (value: string) => {
    return applyMask(value, '(99) 9999-99999');
};

export const maskCEP = (value: string) => {
    return applyMask(value, '99999-999');
};