import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import LanguageIcon from "@mui/icons-material/Language";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>
        <Button startIcon={<LanguageIcon />} onClick={handleOpen}>
          {t("languageButton")}
        </Button>
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("selectLanguage")}</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <FormControl fullWidth>
            <Select value={selectedLanguage} onChange={handleLanguageChange}>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="da">Dansk</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => changeLanguage(selectedLanguage)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
