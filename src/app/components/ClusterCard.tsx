/* eslint-disable @next/next/no-img-element */
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '~/trpc/trpc-provider';

export interface cardCluster {
  cluster: {
    img: string;
    name: string;
    id: string;
  };
}

export default function ClusterCard({ cluster }: cardCluster) {
  const router = useRouter();
  // Fetching the cluster status to display
  const { data: status } = trpc.createCluster.checkClusterStatus.useQuery({
    name: cluster.name
  })

  const deleteCluster = trpc.createCluster.deleteCluster.useMutation();


  const routeToCluster = () => {
    router.push(`${cluster.id}/dashboard`);
  };

  const graidients = [
    'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
    'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
    'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100',
    'bg-gradient-to-r from-green-200 via-green-300 to-blue-500',
    'bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300',
  ];

  const random = Math.floor(Math.random() * 5);
  const statusColor = status === 'ACTIVE' ? 'green' : 'red';
  console.log(`text-${statusColor}-600`);

  const deleteClusterHandler = async () => {
    console.log('Deleting cluster');
    await deleteCluster.mutateAsync({
      id: cluster.id
    })
  };

  return (
    <div
      onClick={routeToCluster}
      className='card h-48 max-w-98 w-72 overflow-hidden rounded-xl bg-base-100 shadow-xl hover:ring-4 '
    >
      <figure className='w-full'>
        <div className={`h-24 w-full object-cover ${graidients[random]}`} />
      </figure>
      <div className='m-4 flex w-full flex-col justify-between'>
        <h2 className='card-title '>{cluster.name}</h2>
        <div className='flex justify-end items-end'>
          <p
            className={`text-${statusColor}-600  mr-6 w-min rounded-xl bg-${statusColor}-100  px-4 align-bottom mx-1 items-end shadow-md`}
          >
            {status}
          </p>
          <button className="text-red-800" onClick={deleteClusterHandler}>DELETE</button>
        </div>
      </div>
    </div>
  );
}
