import * as Yup from 'yup'

export const newUserSchema = Yup.object().shape({
  role: Yup.string().required(),
  name: Yup.string()
    .min(1, 'Given name is too short.')
    .max(128, 'Given name is too long!')
    .required('Please enter a name.'),
  email: Yup.string()
    .email('Given email is not valid.')
    .max(255, 'Given email is too long!')
    .required('Please enter a email'),
  password: Yup.string()
    .required('Please enter a password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      `Given password is not valid. Password must contain following things:
      Atleast 8 characters, which contains small, big and special characters.`
    )
})

export const editUserSchema = Yup.object().shape({
  role: Yup.string().required(),
  name: Yup.string()
    .min(1, 'Given name is too short.')
    .max(128, 'Given name is too long!')
    .required('Please enter a name.'),
  email: Yup.string()
    .email('Given email is not valid.')
    .max(255, 'Given email is too long!')
    .required('Please enter a email')
})

export const newPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Syötä uusi salasana')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      `Given password is not valid. Password must contain following things:
      Atleast 8 characters, which contains small, big and special characters.`
    ),
  rePassword: Yup.string()
    .required('Please enter new password again.')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
})
