import * as cdk from '@aws-cdk/core';
import { EksClusterStack } from './eks-cluster-stack';

export class MyApplicationAppStage extends cdk.Stage {
    
  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
      const clusterStack = new EksClusterStack(this, 'EksClusterStack');      
    }
}