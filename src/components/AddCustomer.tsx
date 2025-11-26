import { Box, TextField, Button } from "@mui/material";

interface AddCustomerRowProps {
  newCustomer: any;
  setNewCustomer: (value: any) => void;
  onAdd: () => void;
}

export default function AddCustomerRow({
  newCustomer,
  setNewCustomer,
  onAdd
}: AddCustomerRowProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "140px 140px 190px 140px 140px 100px 100px 130px",
        gap: 1,
        p: 1,
        borderTop: "1px solid #ddd",
        backgroundColor: "#fafafa"
      }}
    >
      <TextField
        size="small"
        label="Firstname"
        value={newCustomer.firstname}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, firstname: e.target.value })
        }
      />

      <TextField
        size="small"
        label="Lastname"
        value={newCustomer.lastname}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, lastname: e.target.value })
        }
      />

      <TextField
        size="small"
        label="Email"
        value={newCustomer.email}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, email: e.target.value })
        }
      />

      <TextField
        size="small"
        label="Phone"
        value={newCustomer.phone}
        onChange={(e) =>
          setNewCustomer({ ...newCustomer, phone: e.target.value })
        }
      />

      <TextField
        size="small"
        label="Street"
        value={newCustomer.streetaddress}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            streetaddress: e.target.value
          })
        }
      />

      <TextField
        size="small"
        label="City"
        value={newCustomer.city}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            city: e.target.value
          })
        }
      />

      <TextField
        size="small"
        label="Postcode"
        value={newCustomer.postcode}
        onChange={(e) =>
          setNewCustomer({
            ...newCustomer,
            postcode: e.target.value
          })
        }
      />

      <Button
        variant="contained"
        color="success"
        onClick={onAdd}
        sx={{ height: "40px" }}
      >
        Add
      </Button>
    </Box>
  );
}
