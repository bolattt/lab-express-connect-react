import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";

const API = process.env.REACT_APP_API_URL;

export default function Log() {
  const [log, setLog] = useState([]);
  const { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/logs/${index}`)
      .then((data) => setLog(data.data))
      .catch((err) => console.log(err));
  }, [index]);

  const handleDelete = () => {
    axios
      .delete(`${API}/logs/${index}`)
      .then((res) => navigate("/logs"))
      .catch(console.error);
  };

  return (
    <div className="log-container">
      <h2>Show</h2>
      <div className="card">
        <h1>
          {log.title} - By {log.captainName}
        </h1>
        <h3>{log.post}</h3>
        <h4>Days since last crisis: {log.daysSinceLastCrisis}</h4>
      </div>
      <Stack spacing={10} direction="row" sx={{ mt: 8 }}>
        <Link to="/logs">
          <Button
            variant="outlined"
            sx={{ px: 10, py: 1.2 }}
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
        </Link>
        <Link to={"/logs/" + index + "/edit"}>
          <Button
            variant="outlined"
            sx={{ px: 10, py: 1.2 }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Link>

        <Button
          variant="outlined"
          sx={{ px: 10, py: 1.2 }}
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>
    </div>
  );
}
