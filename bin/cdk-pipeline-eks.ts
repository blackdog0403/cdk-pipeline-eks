#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkPipelineEksStack } from '../lib/cdk-pipeline-eks-stack';

const app = new cdk.App();
new CdkPipelineEksStack(app, 'CdkPipelineEksStack', {
  env: {
    account: '245775375184',
    region: 'ap-northeast-2',
  }
});
