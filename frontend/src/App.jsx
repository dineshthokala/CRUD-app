import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const apiUrl = process.env.REACT_APP_API_URL || "https://crud-app-w5bo.onrender.com/api/items";

function App() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ id: "", name: "", description: "" });

    useEffect(() => {
        fetchItems();
    }, []);

    function fetchItems() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(setItems);
    }

    function handleChange(e) {
        const { id, value } = e.target;
        setForm(f => ({ ...f, [id.replace("item-", "")]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { id, name, description } = form;
        const method = id ? "PUT" : "POST";
        const url = id ? `${apiUrl}/${id}` : apiUrl;
        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description })
        }).then(() => {
            setForm({ id: "", name: "", description: "" });
            fetchItems();
        });
    }

    function handleEdit(item) {
        setForm({ id: item.id, name: item.name, description: item.description || "" });
    }

    function handleDelete(id) {
        fetch(`${apiUrl}/${id}`, { method: "DELETE" })
            .then(fetchItems);
    }

    return (
        <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh" }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div">
                        CRUD Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        {form.id ? "Edit Item" : "Add New Item"}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
                    >
                        <input type="hidden" id="item-id" value={form.id} />
                        <TextField
                            id="item-name"
                            label="Name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            sx={{ flex: 1, minWidth: 180 }}
                        />
                        <TextField
                            id="item-description"
                            label="Description"
                            value={form.description}
                            onChange={handleChange}
                            sx={{ flex: 2, minWidth: 220 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color={form.id ? "warning" : "primary"}
                            sx={{ minWidth: 120 }}
                        >
                            {form.id ? "Update" : "Add"}
                        </Button>
                        {form.id && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setForm({ id: "", name: "", description: "" })}
                                sx={{ minWidth: 120 }}
                            >
                                Cancel
                            </Button>
                        )}
                    </Box>
                </Paper>
                <Paper elevation={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(item)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </Box>
    );
}

export default App;
