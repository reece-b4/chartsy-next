import * as React from "react";
// specified imports help minimize bundle size/tree shaking
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SingleItemData } from "chartsy-types";
import { fmt } from "@/lib/utils";

type Props = { iData: SingleItemData };

export default function ItemDataCard({ iData }: Props) {
  const created = React.useMemo(
    () => fmt.format(new Date(iData.created_at)),
    [iData.created_at]
  );
  const updated = React.useMemo(
    () => fmt.format(new Date(iData.created_at)),
    [iData.created_at]
  );
  const showUpdated = created !== updated;
  return (
      <Card
        className="!width-full"
        sx={{
          minWidth: 275,
          marginBottom: "1rem",
        }}>
        <CardContent>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 14,
              mb: showUpdated ? 0 : 1.5,
            }}>
            created: {created}
          </Typography>
          {showUpdated && (
            <Typography sx={{ color: "text.secondary", mb: 1.5, fontSize: 14 }}>
              updated: {updated}
            </Typography>
          )}
          <Divider></Divider>
          <Typography variant="body2" sx={{ mt: 1.5 }}>
            {iData.data_body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">update</Button>
          <Button size="small">delete</Button>
          <Button size="small">insights</Button>
        </CardActions>
      </Card>
  );
}
