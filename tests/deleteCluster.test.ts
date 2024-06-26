/* eslint-disable @typescript-eslint/unbound-method */
const AWS = require('aws-sdk');
import { trpc } from '../src/trpc/trpc-provider';
const deleteCluster = trpc.createCluster.deleteCluster.useMutation();


jest.mock('aws-sdk', () => {
  const mskMock = {
    deleteCluster: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return {
    Kafka: jest.fn(() => mskMock),
  };
});

describe('deleteCluster', () => {
  it('should start the cluster deletion', async () => {
    const clusterArn = 'arn:aws:kafka:region:account-id:cluster/cluster-name/cluster-id';
    const deleteClusterMock = (Kafka as jest.MockedClass<typeof Kafka>).prototype.deleteCluster;
    const promiseMock = deleteClusterMock().promise as jest.Mock<Promise<void>>;

    promiseMock.mockResolvedValue(undefined);

    await expect(deleteCluster(clusterArn)).resolves.toBeUndefined();

    expect(deleteClusterMock).toHaveBeenCalledWith({ ClusterArn: clusterArn });
    expect(promiseMock).toHaveBeenCalled();
  });

  it('should throw an error when cluster is invalid', async () => {
    const clusterArn = 'arn:aws:kafka:region:account-id:cluster/cluster-name/cluster-id';
    const deleteClusterMock = (Kafka as jest.MockedClass<typeof Kafka>).prototype.deleteCluster;
    const promiseMock = deleteClusterMock().promise as jest.Mock<Promise<void>>;

    const error = new Error('Cluster not found');
    promiseMock.mockRejectedValue(error);

    await expect(deleteCluster(clusterArn)).rejects.toThrow('Cluster not found');

    expect(deleteClusterMock).toHaveBeenCalledWith({ ClusterArn: clusterArn });
    expect(promiseMock).toHaveBeenCalled();
  });
});



