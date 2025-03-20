// import React from "react";
// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Divider,
//     Grid2,
// } from "@mui/material";
// import FormInput from "@/components/common/form/FormInput";
//
// interface FieldConfig {
//     name: string;
//     type: string;
//     label: string;
//     isDate?: boolean;
//     isRequired?: boolean;
//     options?: string[];
// }
//
// interface GeneralModalProps {
//     open: boolean;
//     onClose: () => void;
//     selectedItem: Record<string, any> | null;
//     onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     onSave: (id: string | undefined, data: Record<string, any>) => void;
//     fieldConfig: FieldConfig[];
//     errors: Record<string, string>;
//     t: (key: string) => string;
//     module: string;
//     mode?: "add" | "edit";  // Defaults to 'add' if not provided
// }
//
// const GeneralModal: React.FC<GeneralModalProps> = ({
//                                                        open,
//                                                        onClose,
//                                                        selectedItem,
//                                                        onInputChange,
//                                                        onSave,
//                                                        fieldConfig,
//                                                        errors,
//                                                        t,
//                                                        module,
//                                                        mode = "add",
//                                                    }) => {
//     const isEditing = selectedItem !== null;
//
//     const renderField = ({ name, type, label, isDate, isRequired, options }: FieldConfig) => {
//         const isSelect = type === "select";
//
//         return (
//             <Grid2 size={{ xs: 12, sm: 12, md: 12 }} key={name}>
//                 <FormInput
//                     label={label}
//                     name={name}
//                     value={selectedItem?.[name] || ""}
//                     onChange={onInputChange}
//                     error={errors[name]}
//                     helperText={errors[name]}
//                     tooltip={t(`dialog.${module}.tooltip.${name}`)}
//                     type={type}
//                     InputLabelProps={isDate ? { shrink: true } : {}}
//                     required={isRequired}
//                     select={isSelect}
//                     options={isSelect ? options : []}
//                 />
//             </Grid2>
//         );
//     };
//
//     return (
//         <Dialog open={open} onClose={onClose} fullWidth>
//             <DialogTitle>
//                 {/*{isEditing && mode === "edit"*/}
//                 {/*    ? `${t("buttons.edit")} ${t(`dialog.${module}.title`)}`*/}
//                 {/*    : `${t("buttons.add")} ${t(`dialog.${module}.title")}`}*/}
//       </DialogTitle>
//       <Divider sx={{ marginBottom: "5px" }} />
//       <DialogContent>
//         <Grid2 container spacing={2}>
//           {fieldConfig.map((field) => renderField(field))}
//         </Grid2>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => onSave(selectedItem?.id, selectedItem)} variant="contained">
//           {isEditing && mode ===
//           "edit" ? t("buttons.update") : t("buttons.save")}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
//
// export default GeneralModal;
