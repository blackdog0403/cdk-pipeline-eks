import * as cdk from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from '@aws-cdk/pipelines';
import { MyApplicationAppStage } from './my-application-app-stage';

export class CdkPipelineEksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const pipeline = new CodePipeline(this, 'Pipeline', {
      selfMutation: true,
      pipelineName:'CdkPipelineEks',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('blackdog0403/cdk-pipeline-eks', 'master'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    const eksDev = new MyApplicationAppStage(this, 'Dev',{
      env: {
        account: '245775375184',
        region: 'ap-northeast-2',
      }
    });
    pipeline.addStage(eksDev);
  }
}
