import { ChangeEvent, useState } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import {
  Avatar,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputField
} from '@chakra-ui/react'

const CustomFileInput = ({
  fieldError,
  label,
  id,
  inputType,
  register
}: {
  fieldError: FieldError | undefined
  label: string
  id: string
  inputType: string
  register: UseFormRegisterReturn<string>
}) => {
  const [preview, setPreview] = useState<string | null>(null)

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    register.onChange(event)
    if (!event.target.files || !event.target.files.length) {
      return
    }
    const file = event.target.files[0]
    const urlImage = URL.createObjectURL(file)
    setPreview(urlImage)
  }

  return (
    <FormControl
      display={'flex'}
      flexDirection={'column'}
      id={id}
      isInvalid={!!fieldError}
    >
      <FormLabel>{label}</FormLabel>
      <InputField
        placeholder={`${label}`}
        type={inputType}
        {...register}
        onChange={handleUploadedFile}
      />
      <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
      {preview && (
        <Avatar
          alignSelf={'center'}
          width={'10rem'}
          height={'initial'}
          src={preview}
        />
      )}
    </FormControl>
  )
}

export default CustomFileInput
