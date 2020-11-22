import ghpages, { PublishOptions } from 'gh-pages';
import { spawnSync } from 'child_process';
import { promisify } from 'util';

const publish = promisify<string, PublishOptions>(ghpages.publish);

export type Options = PublishOptions & {
  basePath: string;
}

export const deploy = (options: Options) => {
  const { basePath, ...publishOptions} = options;
  if (!basePath) {
    throw new Error('basePath must be defined');
  }

  const gitShowCommand = 'show -s --format=reference';

  const output = spawnSync('git', gitShowCommand.split(' '));

  if (output.status !== 0) {
    throw new Error(output.stderr.toString());
  }

  const message = `Built from ${output.stdout.toString()}`;

  return publish(basePath, {
    ...publishOptions,
    message,
  });
}
