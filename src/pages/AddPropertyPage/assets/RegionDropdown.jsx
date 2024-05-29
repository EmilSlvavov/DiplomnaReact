import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = new Map([
  ["Blagoevgrad", "Blagoevgrad"],
  ["Burgas", "Burgas"],
  ["Dobrich", "Dobrich"],
  ["Gabrovo", "Gabrovo"],
  ["Haskovo", "Haskovo"],
  ["Kardzhali", "Kardzhali"],
  ["Kyustendil", "Kyustendil"],
  ["Lovech", "Lovech"],
  ["Montana", "Montana"],
  ["Pazardzhik", "Pazardzhik"],
  ["Pernik", "Pernik"],
  ["Pleven", "Pleven"],
  ["Plovdiv", "Plovdiv"],
  ["Razgrad", "Razgrad"],
  ["Ruse", "Ruse"],
  ["Shumen", "Shumen"],
  ["Silistra", "Silistra"],
  ["Sliven", "Sliven"],
  ["Smolyan", "Smolyan"],
  ["Sofia City", "Sofia_City"],
  ["Sofia Province", "Sofia_Province"],
  ["Stara Zagora", "Stara_Zagora"],
  ["Targovishte", "Targovishte"],
  ["Varna", "Varna"],
  ["Veliko Tarnovo", "Veliko_Tarnovo"],
  ["Vidin", "Vidin"],
  ["Vratsa", "Vratsa"],
  ["Yambol", "Yambol"],
]);

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectRegion({ setCity }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCity(names.get(value).toUpperCase());
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          style={{ backgroundColor: "#ece9fb" }}
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Region</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {Array.from(names).map(([key, value]) => (
            <MenuItem
              key={key}
              value={key}
              style={getStyles(key, personName, theme)}
            >
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
