import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Contact, MapPinned, Plus, Trash2, UserRoundPlus } from 'lucide-react';
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supplierSchema } from '../../utils/schemas/supplier.schema';

import * as yup from 'yup';

import { Button } from '../../styles/globalStyle';
import { theme } from '../../theme/theme';
import {
  ActionContainer,
  AddContactButton,
  ContactItem,
  ContactList,
  ErrorMessage,
  FormContainer,
  FormGroup,
  FormItem,
  FormSection,
  Input,
  Label,
  RemoveContactButton,
  Required,
  SectionTitle,
  SectionTitleContainer,
} from './supplier-form.styles';

interface SupplierFormProps {
  refetchData: () => void;
  edit?: {
    id: string;
    data: yup.InferType<typeof supplierSchema>;
  };
}

const SupplierForm: React.FC<SupplierFormProps> = ({ refetchData, edit }) => {
  const [loading, setLoading] = React.useState(false);

  const { register, control, handleSubmit, setValue, formState: { errors }, trigger, reset } = useForm<yup.InferType<typeof supplierSchema>>({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      contacts: [{ name: '', phoneNumber: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  useEffect(() => {

    if (edit)
      reset(edit.data);

  }, [edit, reset]);

  const onSubmit = async (data: yup.InferType<typeof supplierSchema>) => {
    try {
      setLoading(true);
      if (edit)
        await axios.put(`http://localhost:3000/suppliers/${edit.id}`, data);
      else
        await axios.post('http://localhost:3000/suppliers', data);

      toast.success(edit ? 'Fornecedor atualizado com sucesso!' : 'Fornecedor criado com sucesso!');

    } catch (error) {
      toast.error(edit ? 'Erro ao atualizar fornecedor!' : 'Erro ao criar fornecedor!');
    } finally {
      setLoading(false);
      refetchData();
    }
  };

  const fetchAddressData = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        toast.error('CEP não encontrado!');
        return;
      }

      const { logradouro, localidade, uf } = response.data;

      setValue('address.street', logradouro);
      setValue('address.city', localidade);
      setValue('address.state', uf);

      trigger('address.street');
      trigger('address.city');
      trigger('address.state');

    } catch (error) {
      toast.error('Erro ao buscar endereço!');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormSection>
        <SectionTitleContainer>
          <UserRoundPlus size={28} color={theme.colors.primary} />
          <SectionTitle>
            {edit ? 'Editar Fornecedor' : 'Novo Fornecedor'}
          </SectionTitle>
        </SectionTitleContainer>

        <FormGroup columns={2}>
          <FormItem>
            <Label htmlFor="name">
              Nome <Required />
            </Label>
            <Input id="name"{...register('name')} />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </FormItem>

          <FormItem>
            <Label htmlFor="description">
              Descrição
            </Label>
            <Input id="description" {...register('description')} />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </FormItem>
        </FormGroup>
      </FormSection>

      <FormSection>
        <ContactList>
          <SectionTitleContainer>
            <Contact size={28} color={theme.colors.primary} />
            <SectionTitle>
              Contatos
            </SectionTitle>
          </SectionTitleContainer>

          {fields.map((field, index) => (
            <ContactItem key={field.id}>
              <FormGroup columns={2}>
                <FormItem>
                  <Label htmlFor={`contacts.${index}.name`}>Nome<Required /></Label>
                  <Input id={`contacts.${index}.name`} {...register(`contacts.${index}.name`)} />
                  {errors.contacts?.[index]?.name && <ErrorMessage>{errors.contacts[index].name.message}</ErrorMessage>}
                </FormItem>

                <FormItem>
                  <Label htmlFor={`contacts.${index}.phoneNumber`}>Telefone <Required /></Label>
                  <Controller
                    name={`contacts.${index}.phoneNumber`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        id={`contacts.${index}.phoneNumber`}
                        {...field}
                        onChange={(e) => {
                          const formatted = e.target.value
                            .replace(/\D/g, '')
                            .replace(/(\d{2})(\d)/, '($1) $2')
                            .replace(/(\d{5})(\d)/, '$1-$2')
                            .substr(0, 15);
                          field.onChange(formatted);
                        }}
                      />
                    )}
                  />
                  {errors.contacts?.[index]?.phoneNumber && <ErrorMessage>{errors.contacts[index].phoneNumber.message}</ErrorMessage>}
                </FormItem>
              </FormGroup>
              {index > 0 && (
                <ActionContainer>
                  <RemoveContactButton type="button" onClick={() => remove(index)}>
                    <Trash2 size={20} />
                    Remover
                  </RemoveContactButton>
                </ActionContainer>
              )}
            </ContactItem>
          ))}
        </ContactList>
      </FormSection>

      <FormSection>
        <AddContactButton type="button" onClick={() => append({ name: '', phoneNumber: '' })}>
          <Plus size={20} />
          Adicionar Contato
        </AddContactButton>
      </FormSection>

      <FormSection>
        <SectionTitleContainer>
          <MapPinned size={28} color={theme.colors.primary} />
          <SectionTitle>
            Dados de Endereço
          </SectionTitle>
        </SectionTitleContainer>

        <FormGroup columns={3}>
          <FormItem>
            <Label htmlFor="address.cep">CEP <Required /></Label>
            <Controller
              name="address.cep"
              control={control}
              render={({ field }) => (
                <Input
                  id="address.cep"
                  {...field}
                  onChange={(e) => {
                    const formatted = e.target.value
                      .replace(/\D/g, '')
                      .replace(/(\d{5})(\d)/, '$1-$2')
                      .substr(0, 9);
                    field.onChange(formatted);
                    if (formatted.length === 9) {
                      fetchAddressData(formatted);
                    }
                  }}
                />
              )}
            />
            {errors.address?.cep && <ErrorMessage>{errors.address.cep.message}</ErrorMessage>}
          </FormItem>

          <FormItem>
            <Label htmlFor="address.state">Estado <Required /></Label>
            <Input disabled id="address.state" {...register('address.state')} maxLength={2} style={{ textTransform: 'uppercase' }} />
            {errors.address?.state && <ErrorMessage>{errors.address.state.message}</ErrorMessage>}
          </FormItem>

          <FormItem>
            <Label htmlFor="address.city">Cidade <Required /></Label>
            <Input disabled id="address.city" {...register('address.city')} />
            {errors.address?.city && <ErrorMessage>{errors.address.city.message}</ErrorMessage>}
          </FormItem>

          <FormItem>
            <Label htmlFor="address.street">Logradouro <Required /></Label>
            <Input disabled id="address.street" {...register('address.street')} />
            {errors.address?.street && <ErrorMessage>{errors.address.street.message}</ErrorMessage>}
          </FormItem>

          <FormItem>
            <Label htmlFor="address.reference">Referência</Label>
            <Input id="address.reference" {...register('address.reference')} />
            {errors.address?.reference && <ErrorMessage>{errors.address.reference.message}</ErrorMessage>}
          </FormItem>

          <FormItem width="100px">
            <Label htmlFor="address.number">Número <Required /></Label>
            <Input
              id="address.number"
              type="number" {...register('address.number')}
            />
            {errors.address?.number && <ErrorMessage>{errors.address.number.message}</ErrorMessage>}
          </FormItem>
        </FormGroup>
      </FormSection>

      <ActionContainer>
        <Button type={loading ? 'button' : 'submit'}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </ActionContainer>
    </FormContainer>
  );
};

export default SupplierForm;