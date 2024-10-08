import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { House } from "./Header";

type HouseSwitcherProps = {
  preferredHouse: House | null;
  setPreferredHouse: (house: House) => void;
};

export default function HouseSwitcher({
  preferredHouse,
  setPreferredHouse,
}: HouseSwitcherProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHouseChange = (event: SelectChangeEvent<House>) => {
    const selectedHouse = event.target.value as House;
    setPreferredHouse(selectedHouse);
    localStorage.setItem("preferredHouse", selectedHouse);
    handleClose();
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>
        <Button onClick={handleOpen}>{t("favhouse")}</Button>
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("selectHouse")}</DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <FormControl fullWidth>
            <Select value={preferredHouse ?? ""} onChange={handleHouseChange}>
              <MenuItem value="Gryffindor">Gryffindor</MenuItem>
              <MenuItem value="Slytherin">Slytherin</MenuItem>
              <MenuItem value="Hufflepuff">Hufflepuff</MenuItem>
              <MenuItem value="Ravenclaw">Ravenclaw</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
