import { ChangeEvent, ReactNode, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import {
  Avatar,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputField
} from '@chakra-ui/react'
import { CustomFileInputParams } from './types'

const CustomFileInput = <T extends FieldValues>({
  fieldError,
  label,
  name,
  register
}: CustomFileInputParams<T>) => {
  // State to store preview image URL
  const [preview, setPreview] = useState<string | null>(null)

  // Function to handle uploaded file
  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    // Call onChange event handler
    register(name).onChange(event)

    // If no file selected, return
    if (!event.target.files || !event.target.files.length) {
      return
    }

    // Get the uploaded file
    const file = event.target.files[0]

    // Create URL for the file and set it as preview
    const urlImage = URL.createObjectURL(file)
    setPreview(urlImage)
  }

  // Customize register object to include custom event handler
  const customRegister = { ...register(name), onChange: handleUploadedFile }
  return (
    <FormControl
      display={'flex'}
      flexDirection={'column'}
      id={name}
      isInvalid={!!fieldError}
    >
      <FormLabel>{label}</FormLabel>
      <InputField placeholder={`${label}`} type='file' {...customRegister} />
      <FormErrorMessage>{fieldError?.message as ReactNode}</FormErrorMessage>
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
