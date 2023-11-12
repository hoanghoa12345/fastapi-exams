"""add_new_part_index_column_parts_table

Revision ID: 2257b639c2f7
Revises: 
Create Date: 2023-11-11 08:34:23.727509

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2257b639c2f7'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('parts', sa.Column('part_index', sa.Integer, nullable=True))


def downgrade() -> None:
    op.drop_column('parts', 'part_index')
