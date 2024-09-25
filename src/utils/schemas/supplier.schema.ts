import * as yup from 'yup';

const REGEX_ALPHANUMERIC_FORMAT = /^[A-Za-zÀ-ú,\s\d]+$/
const REGEX_ALPHABETIC_FORMAT = /^[A-Za-zÀ-ú\s]+$/
const REGEX_PHONE_NUMBER_FORMAT = /^\(\d{2}\)\s\d{5}-\d{4}$/
const REGEX_ONLY_TWO_UPPERCASE_LETTERS = /^[A-Z]{2}$/
const REGEX_CEP_FORMAT = /^\d{5}-\d{3}$/

export const supplierSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório').matches(REGEX_ALPHANUMERIC_FORMAT, 'Nome inválido'),
    description: yup.string().matches(REGEX_ALPHANUMERIC_FORMAT, 'Descrição inválida'),
    contacts: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Nome do contato é obrigatório').matches(REGEX_ALPHANUMERIC_FORMAT, 'Nome do contato deve ser alfabético'),
            phoneNumber: yup.string().required('Número de telefone é obrigatório').matches(REGEX_PHONE_NUMBER_FORMAT, 'Formato inválido. Use o formato (##) #####-####')
        })
    ).min(1, 'Pelo menos um contato é obrigatório'),
    address: yup.object().shape({
        cep: yup.string().required('CEP é obrigatório').matches(REGEX_CEP_FORMAT, 'Formato inválido. Use #####-###'),
        state: yup.string().required('Estado é obrigatório').matches(REGEX_ONLY_TWO_UPPERCASE_LETTERS, 'Estado deve ter 2 caracteres maiúsculos'),
        city: yup.string().required('Cidade é obrigatória').matches(REGEX_ALPHABETIC_FORMAT, 'Cidade inválida'),
        street: yup.string().required('Logradouro é obrigatório').matches(REGEX_ALPHANUMERIC_FORMAT, 'Logradouro inválido'),
        number: yup.lazy((value) => (value === '' ? yup.string() : yup.number()).required('Número é obrigatório')),
        reference: yup.string().notRequired().matches(REGEX_ALPHANUMERIC_FORMAT, {
            excludeEmptyString: true,
            message: 'Referência inválida'
        })
    }),
});