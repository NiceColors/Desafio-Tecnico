import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Contact, MapPinned, Plus, Trash2, UserRoundPlus } from 'lucide-react';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supplierSchema } from '../../utils/schemas/supplier.schema';

import * as yup from 'yup';



const notify = () => toast('Here is your toast.');

import { theme } from '../../theme/theme';
import {
  ActionContainer,
  AddContactButton,
  Button,
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

const SupplierForm: React.FC = () => {



  const { register, control, handleSubmit, setValue, formState: { errors }, trigger } = useForm<yup.InferType<typeof supplierSchema>>({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      contacts: [{ name: '', phoneNumber: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  const onSubmit = async (data: yup.InferType<typeof supplierSchema>) => {
    try {
      await axios.post('http://localhost:3000/suppliers', data);
      toast.success('Fornecedor criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar fornecedor!');
    }
  };

  const fetchAddressData = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      setValue('address.street', logradouro);
      setValue('address.city', localidade);
      setValue('address.state', uf);

      trigger()

    } catch (error) {
      console.error('Erro ao buscar dados do CEP:', error);
    }
  };

  return (
    <>

      <FormContainer onSubmit={handleSubmit(onSubmit)}>


        <FormSection>

          <SectionTitleContainer>
            <UserRoundPlus size={36} color={theme.colors.primary} />
            <SectionTitle>
              Novo Fornecedor
            </SectionTitle>
          </SectionTitleContainer>


          <FormGroup
            columns={2}
          >
            <FormItem>
              <Label htmlFor="name">
                Nome <Required />
              </Label>
              <Input id="name" {...register('name')} />
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
              <Contact size={36} color={theme.colors.primary} />
              <SectionTitle>
                Contatos
              </SectionTitle>
            </SectionTitleContainer>

            {fields.map((field, index) => (
              <ContactItem key={field.id}>
                <FormGroup
                  columns={2}
                >
                  <FormItem>
                    <Label htmlFor={`contacts.${index}.name`}>Nome do Contato <Required /></Label>
                    <Input id={`contacts.${index}.name`} {...register(`contacts.${index}.name`)} />
                    {errors.contacts?.[index]?.name && <ErrorMessage>{errors.contacts[index].name.message}</ErrorMessage>}
                  </FormItem>

                  <FormItem>
                    <Label htmlFor={`contacts.${index}.phoneNumber`}>Número de Telefone <Required /></Label>
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

        <AddContactButton type="button" onClick={() => append({ name: '', phoneNumber: '' })}>
          <Plus size={20} />
          Adicionar Contato
        </AddContactButton>


        <FormSection>
          <SectionTitleContainer>
            <MapPinned size={36} color={theme.colors.primary} />
            <SectionTitle>
              Dados de Endereço
            </SectionTitle>
          </SectionTitleContainer>

          <FormGroup
            columns={3}
          >

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
              <Input id="address.state" {...register('address.state')} maxLength={2} style={{ textTransform: 'uppercase' }} />
              {errors.address?.state && <ErrorMessage>{errors.address.state.message}</ErrorMessage>}
            </FormItem>

            <FormItem>
              <Label htmlFor="address.city">Cidade <Required /></Label>
              <Input id="address.city" {...register('address.city')} />
              {errors.address?.city && <ErrorMessage>{errors.address.city.message}</ErrorMessage>}
            </FormItem>

          </FormGroup>

          <FormGroup
            columns={3}
          >
            <FormItem>
              <Label htmlFor="address.street">Logradouro <Required /></Label>
              <Input id="address.street" {...register('address.street')} />
              {errors.address?.street && <ErrorMessage>{errors.address.street.message}</ErrorMessage>}
            </FormItem>



            <FormItem>
              <Label htmlFor="address.reference">Referência</Label>
              <Input id="address.reference" {...register('address.reference')} />
              {errors.address?.reference && <ErrorMessage>{errors.address.reference.message}</ErrorMessage>}
            </FormItem>


            <FormItem
              width="100px"
            >
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
          <Button type="submit">Salvar</Button>
        </ActionContainer>

      </FormContainer>
    </>


  );
};

export default SupplierForm;