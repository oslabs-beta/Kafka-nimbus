/* eslint-disable @typescript-eslint/unbound-method */
import AWS from 'aws-sdk';
import { trpc } from '../src/trpc/trpc-provider';
import { deleteCluster } from '../src/server/service/checkClusterStatus.ts';
// const deleteCluster = trpc.createCluster.deleteCluster.useMutation();

describe("deleteCluster", () => {
  it("should sucessfully return successful cluster deletion status", () => {
    const id = '60d5f60f8f8d8b7b0c2b7b81';
    const response = deleteCluster(id);
    expect(response).toEqual({ status: 'Deleting' });
  });
  it('should throw an error for an invalid cluster ID', () => {
    const invalidId = '69d5f60f8f8d8b7f0c2b3b88';
    expect(() => deleteCluster(invalidId)).toThrow(`Cannot find cluster with ID: ${invalidId}`);
  });
});

// jest.mock('aws-sdk', () => {
//   const mskMock = {
//     deleteCluster: jest.fn().mockReturnThis(),
//     promise: jest.fn(),
//   };
//   return {
//     Kafka: jest.fn(() => mskMock),
//   };
// });

// describe('deleteCluster', () => {
//   it('should start the cluster deletion', async () => {
//     const clusterId = "1";
//     const deleteClusterMock = (Kafka as jest.MockedClass<typeof Kafka>).prototype.deleteCluster;
//     const promiseMock = deleteClusterMock().promise as jest.Mock<Promise<void>>;

//     promiseMock.mockResolvedValue(undefined);

//     await expect(deleteCluster({ id: clusterId })).resolves.toBeUndefined();

//     expect(deleteClusterMock).toHaveBeenCalledWith({ id: clusterId });
//     expect(promiseMock).toHaveBeenCalled();
//   });

//   it('should throw an error when cluster is invalid', async () => {
//     const clusterId = "1";
//     const deleteClusterMock = (Kafka as jest.MockedClass<typeof Kafka>).prototype.deleteCluster;
//     const promiseMock = deleteClusterMock().promise as jest.Mock<Promise<void>>;

//     const error = new Error('Cluster not found');
//     promiseMock.mockRejectedValue(error);

//     await expect(deleteCluster({ id: clusterId })).rejects.toThrow('Cluster not found');

//     expect(deleteClusterMock).toHaveBeenCalledWith({ id: clusterId });
//     expect(promiseMock).toHaveBeenCalled();
//   });
// });



