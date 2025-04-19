export const getSnapshotId = ({
    resourceId,
    snapshotId,
}: {
    resourceId: string;
    snapshotId: number | string;
}) => {
    return `${resourceId}_${snapshotId}`;
};

export const parseSnapshotId = (id: string) => {
    const [_, snapshotId] = id.split('_');

    return snapshotId;
};
