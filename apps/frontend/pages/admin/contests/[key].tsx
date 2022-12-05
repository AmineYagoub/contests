import { withAuth } from '@/components/common/withAuth';
import { PermissionTitle } from '@/graphql/graphql';

const ContestDetailsPage = () => {
  return <div>ContestDetailsPage</div>;
};

export default withAuth(ContestDetailsPage, [PermissionTitle.AccessDashboard]);
