"""Package settings for config.

Expose a default settings module so that `config.settings` can be used
as the Django settings module. In local development via Docker we import
from `local_docker.py` by default. This keeps compatibility with
`DJANGO_SETTINGS_MODULE=config.settings` used in compose.yml.
"""

from .local_docker import *
