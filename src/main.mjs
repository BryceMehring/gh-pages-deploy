import ghpages from 'gh-pages';
import { spawnSync } from 'child_process';

export const deploy = ({basePath, branch, history = true}) => {
  if (!basePath || !branch) {
    console.error('basePath and branch must be defined');
    return;
  }

  const gitShowCommand = 'show -s --format=reference';

  const output = spawnSync('git', gitShowCommand.split(' '));

  if (output.status === 0) {
    const message = `Built from ${output.stdout.toString()}`;

    ghpages.publish(basePath, {
      branch,
      history,
      message,
    }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Deploy successful');
      }
    });
  } else {
    console.error(output.stderr.toString());
  }
}
