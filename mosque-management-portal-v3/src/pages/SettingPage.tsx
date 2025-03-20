// import React, {useState} from 'react';
// import {
//     Avatar,
//     Box,
//     Button,
//     Checkbox,
//     Divider,
//     FormControl,
//     FormControlLabel,
//     Grid2,
//     InputLabel,
//     MenuItem,
//     Paper,
//     Select,
//     TextField,
//     Typography,
// } from '@mui/material';
//
// // Define the types for ProfileField props
// interface ProfileFieldProps {
//     label: string,
//     name: string,
//     value?: string | string[],
//     onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
//     readOnly: boolean,
// }
//
// // Component for individual profile field
// const ProfileField: React.FC<ProfileFieldProps> = ({label, name, value, onChange, readOnly}) => (
//     <Grid2 size = {{xs: 12, sm: 6, md: 6}} >
//         <TextField
//             fullWidth
//             label = {label}
//             name = {name}
//             value = {value}
//             onChange = {onChange}
//             variant = "outlined"
//             margin = "normal"
//             slotProps = {{
//                 input: {
//                     readOnly,
//                 },
//             }}
//         />
//     </Grid2 >
// );
//
// // Define the types for SkillsSelect props
// interface SkillsSelectProps {
//     skills: string[];
//     onChange: React.ChangeEventHandler<{ value: unknown }>;
//     readOnly: boolean;
// }
//
// // Component for skills selection
// const SkillsSelect: React.FC<SkillsSelectProps> = ({skills, onChange, readOnly}) => (
//     <Grid2 size = {{xs: 12, sm: 6, md: 6}} >
//         <FormControl fullWidth variant = "outlined" margin = "normal" >
//             <InputLabel >Skills</InputLabel >
//             <Select
//                 multiple
//                 value = {skills}
//                 onChange = {onChange}
//                 renderValue = {(selected: any[]) => selected.join(', ')}
//                 inputProps = {{
//                     readOnly,
//                 }}
//             >
//                 {['JavaScript', 'React', 'Node.js', 'Material-UI', 'CSS', 'HTML'].map((skill) => (
//                     <MenuItem key = {skill} value = {skill} >
//                         <Checkbox checked = {skills.indexOf(skill) > -1} />
//                         {skill}
//                     </MenuItem >
//                 ))}
//             </Select >
//         </FormControl >
//     </Grid2 >
// );
//
// // Define the type for profileInfo state
// interface ProfileInfo {
//     name: string;
//     email: string;
//     phone: string;
//     location: string;
//     skills: string[];
//     role: string;
// }
//
// const SettingPage: React.FC = () => {
//     const [profileImage, setProfileImage] = useState<string>('https://via.placeholder.com/150');
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         phone: '+1234567890',
//         location: 'New York, USA',
//         skills: ['JavaScript', 'React'],
//         role: 'Full Stack Developer',
//     });
//
//     const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setProfileImage(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//
//     const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
//         const {name, value} = event.target;
//         setProfileInfo((prevInfo) => ({
//             ...prevInfo,
//             [name]: value,
//         }));
//     };
//
//     const handleSkillsChange: React.ChangeEventHandler<{ value: unknown }> = (event) => {
//         const skillsArray = event.target.value as string[];
//         setProfileInfo((prevInfo) => ({...prevInfo, skills: skillsArray}));
//     };
//
//     const toggleEdit = () => {
//         setIsEditing((prev) => !prev);
//     };
//
//     return (
//         <Box sx = {{flexGrow: 1, padding: 4}} >
//             <Paper elevation = {3} sx = {{padding: 3, borderRadius: 2}} >
//                 <Typography variant = "h6" gutterBottom sx = {{fontWeight: 'bold'}} >
//                     Profile Information
//                 </Typography >
//                 <Divider sx = {{marginBottom: 2}} />
//
//                 <Grid2 container spacing = {3} alignItems = "center" >
//                     <Grid2 size = {{xs: 12, sm: 12, md: 12}} container justifyContent = "center" >
//                         <Button
//                             component = "label"
//                             sx = {{
//                                 padding: 0,
//                                 backgroundColor: 'transparent',
//                                 '&:hover': {backgroundColor: 'transparent'},
//                             }}
//                         >
//                             <Avatar
//                                 alt = "Profile Picture"
//                                 src = {profileImage}
//                                 sx = {{width: 120, height: 120, border: '2px solid #1976d2'}}
//                             />
//                             <input
//                                 type = "file"
//                                 hidden
//                                 accept = "image/*"
//                                 onChange = {handleImageChange}
//                             />
//                         </Button >
//                     </Grid2 >
//
//                     {/* Using ProfileField component for individual fields */}
//                     {[
//                         {label: 'Name', name: 'name'},
//                         {label: 'Email', name: 'email'},
//                         {label: 'Phone', name: 'phone'},
//                         {label: 'Location', name: 'location'},
//                         {label: 'Role', name: 'role'},
//                     ].map((field) => (
//                         <ProfileField
//                             key = {field.name}
//                             label = {field.label}
//                             name = {field.name}
//                             value = {profileInfo[field.name as keyof ProfileInfo]}
//                             onChange = {handleInputChange}
//                             readOnly = {!isEditing}
//                         />
//                     ))}
//
//                     {/* Using SkillsSelect component for skills */}
//                     <SkillsSelect
//                         skills = {profileInfo.skills}
//                         onChange = {handleSkillsChange}
//                         readOnly = {!isEditing}
//                     />
//                 </Grid2 >
//
//                 {/* Edit Toggle */}
//                 <FormControlLabel
//                     control = {<Checkbox checked = {isEditing} onChange = {toggleEdit} />}
//                     label = "Edit Mode"
//                     sx = {{marginTop: 2}}
//                 />
//                 {isEditing && (
//                     <Button
//                         variant = "contained"
//                         color = "primary"
//                         onClick = {() => alert('Profile updated!')}
//                         sx = {{marginTop: 2}}
//                     >
//                         Save Changes
//                     </Button >
//                 )}
//             </Paper >
//         </Box >
//     );
// };
//
// export default SettingPage;
