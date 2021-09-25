import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
export class EksClusterStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const cluster = new eks.Cluster(this, 'cluster', {
            clusterName: 'app-modernization-demo',          
            version: eks.KubernetesVersion.V1_20,
            defaultCapacity: 0
        });
        cluster.addNodegroupCapacity('m5-node-group', {
            instanceTypes: [new ec2.InstanceType('m5.large')],
            minSize: 3
        });

        const adminUser = iam.User.fromUserArn(this, 'MyImportedUserByArn', 'arn:aws:iam::245775375184:user/blackdog-dev');
        const adminRole = iam.Role.fromRoleArn(this, 'MyImportedRoleByArn', 'arn:aws:iam::245775375184:role/eksworkshop-admin');
        cluster.awsAuth.addUserMapping(adminUser, { groups: [ 'system:masters' ]});
        cluster.awsAuth.addRoleMapping(adminRole, { groups: [ 'system:masters' ]});
    }
}
