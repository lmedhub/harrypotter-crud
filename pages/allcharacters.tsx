import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import { getSession, GetSessionParams } from "next-auth/react";
import UnauthorizedPage from "../components/Unauthorized";
import { Session } from "next-auth";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import EmptyData from "../components/EmptyData";
import CharacterList from "../components/CharacterList";
import { CharacterProps } from "../types";

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context);

  // Default fetch to all characters
  const response = await fetch("https://hp-api.onrender.com/api/characters");
  const characters = await response.json();

  const allCharacters = characters.map((character: CharacterProps) => ({
    id: character.id,
    name: character.name,
    house: character.house,
    image: character.image,
  }));

  return {
    props: { initialCharacters: allCharacters, session },
  };
};

type Props = {
  initialCharacters: CharacterProps[];
  session: Session;
};

const AllCharacters: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { initialCharacters, session } = props;

  const [selectedOption, setSelectedOption] = useState("all");
  const [characters, setCharacters] =
    useState<CharacterProps[]>(initialCharacters);

  useEffect(() => {
    const fetchData = async () => {
      let url = "https://hp-api.onrender.com/api/characters";

      if (selectedOption === "students") {
        url = "https://hp-api.onrender.com/api/characters/students";
      } else if (selectedOption === "staff") {
        url = "https://hp-api.onrender.com/api/characters/staff";
      }

      const response = await fetch(url);
      const data = await response.json();

      const fetchedCharacters = data.map((character: CharacterProps) => ({
        id: character.id,
        name: character.name,
        house: character.house,
        image: character.image,
      }));

      setCharacters(fetchedCharacters);
    };

    fetchData();
  }, [selectedOption]);

  if (!session) {
    return <UnauthorizedPage />;
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  if (characters.length === 0) {
    return <EmptyData />;
  }

  return (
    <Layout>
      <PageHeader title={t("harrycharacters")} shouldNotBack />

      <Box>
        <RadioGroup value={selectedOption} onChange={handleOptionChange} row>
          <FormControlLabel
            value="all"
            control={<Radio color="secondary" />}
            label={t("allcharacters")}
          />
          <FormControlLabel
            value="students"
            control={<Radio color="secondary" />}
            label={t("students")}
          />
          <FormControlLabel
            value="staff"
            control={<Radio color="secondary" />}
            label={t("staff")}
          />
        </RadioGroup>
      </Box>

      <CharacterList characters={characters} />
    </Layout>
  );
};

export default AllCharacters;
