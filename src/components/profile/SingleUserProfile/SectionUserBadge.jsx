import { Badge, statusStyles } from "../SingleUserProfile.styles.js";

const StatusUserBadge = ({ status = "PENDING" }) => {
  const { Icon, label } = statusStyles[status];
  return (
    <Badge $status={status}>
      <Icon size={16} />
      {label}
    </Badge>
  );
};

export default StatusUserBadge;
