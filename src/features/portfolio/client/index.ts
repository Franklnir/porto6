/** Portfolio browser entrypoint.
 * Each animation domain is isolated in its own side-effect module so errors can
 * be located by section without loading a UI framework runtime.
 */
import './theme-controller';
import './legacy/01-core-ui';
import './legacy/02-motion-system';
import './legacy/03-dark-section-cover';
import './legacy/04-capability-lookbook';
import './legacy/05-shared-profile';
import './legacy/06-project-details';
import './legacy/07-process-lookbook';
